import React from "react";
import { AUTH_TOKEN, LINKS_PER_PAGE } from "../constants/auth";
import { timeDifferenceForDate } from "../untils/time";
import { useMutation, gql } from "@apollo/client";
import { FEED_QUERY } from "./LinkList";

const VOTE_MUTATION = gql`
  mutation VoteMutation($linkId: ID!) {
    vote(linkId: $linkId) {
      id
      link {
        id
        votes {
          id
          user {
            id
          }
        }
      }
      user {
        id
      }
    }
  }
`;

const Link = (props) => {
  const { link } = props;
  const authToken = localStorage.getItem(AUTH_TOKEN);

  const take = LINKS_PER_PAGE;
  const skip = 0;
  const orderBy = { createdAt: "desc" };

  const [vote] = useMutation(VOTE_MUTATION, {
    variables: {
      linkId: link.id,
    },
    update: (cache, { data: { vote } }) => {
      const { feed } = cache.readQuery({
        query: FEED_QUERY,
        variables: {
          take,
          skip,
          orderBy,
        },
      });

      const updatedLinks = feed.links.map((feedLink) => {
        if (feedLink.id === link.id) {
          return {
            ...feedLink,
            votes: [...feedLink.votes, vote],
          };
        }
        return feedLink;
      });

      cache.writeQuery({
        query: FEED_QUERY,
        data: {
          feed: {
            links: updatedLinks,
          },
        },
        variables: {
          take,
          skip,
          orderBy,
        },
      });
    },
  });

  return (
    <>
      <div className="flex justify-start mt-2 border rounded-md">
        <div className="flex justify-center">
          {authToken && (
            <div>
              <div
                className="mx-2 text-gray-500 text-base"
                style={{ cursor: "pointer" }}
                onClick={vote}
              >
                ▲
              </div>
              <div>{link.votes?.length}</div>
            </div>
          )}
          <span className="text-gray-500 mx-2 text-lg">{props.index + 1}.</span>
        </div>
        <div className="text-start">
          <div className="text-lg">
            {link.description} ({link.url})
          </div>
          {
            <div className="text-base text-gray-500">
              by {link.postedBy ? link.postedBy.name : "Unknown"}
              {timeDifferenceForDate(link.createdAt)}
            </div>
          }
        </div>
      </div>
    </>
  );
};

export default Link;
