import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import { FEED_QUERY } from "./LinkList";
import { AUTH_TOKEN, LINKS_PER_PAGE } from "../constants/auth";

const CREATE_LINK_MUTATION = gql`
  mutation PostMutation($description: String!, $url: String!) {
    post(description: $description, url: $url) {
      id
      createdAt
      url
      description
    }
  }
`;

const CreateLink = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    description: "",
    url: "",
  });

  const [createLink] = useMutation(CREATE_LINK_MUTATION, {
    variables: {
      description: formState.description,
      url: formState.url,
    },
    update(cache, { data: { post } }) {
      const take = LINKS_PER_PAGE;
      const skip = 0;
      const orderBy = { createdAt: "desc" };
      const { feed } = cache.readQuery({
        query: FEED_QUERY,
        variables: {
          take,
          skip,
          orderBy,
        },
      });
      cache.writeQuery({
        query: FEED_QUERY,
        data: {
          feed: {
            links: [post, ...data.feed.links],
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
    <div className="w-3/5 mx-auto">
      <h4 className="my-5 text-2xl font-bold text-orange-400">Create Link</h4>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createLink();
          navigate("/");
        }}
      >
        <div className="flex flex-col mt-3">
          <input
            className="my-1 py-2 border rounded px-1"
            value={formState.description}
            onChange={(e) =>
              setFormState({
                ...formState,
                description: e.target.value,
              })
            }
            type="text"
            placeholder="A description for the link"
          />
          <input
            className="my-1 py-2 border rounded px-1"
            value={formState.url}
            onChange={(e) =>
              setFormState({
                ...formState,
                url: e.target.value,
              })
            }
            type="text"
            placeholder="The URL for the link"
          />
        </div>
        <button
          type="submit"
          className="w-1/4 mx-auto bg-gray-300
        border rounded py-2 my-2 font-semibold"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateLink;
