import React, { useState } from "react";
import { useLazyQuery, gql } from "@apollo/client";
import Link from "./Link";

const FEED_SEARCH_QUERY = gql`
  query FeedSearchQuery($filter: String!) {
    feed(filter: $filter) {
      id
      links {
        id
        url
        description
        createdAt
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
    }
  }
`;

const Search = () => {
  const [searchFilter, setSearchFilter] = useState("");
  const [executeSearch, { data }] = useLazyQuery(FEED_SEARCH_QUERY);
  return (
    <>
      <div className="my-2">
        <h4 className="font-bold text-xl my-4 text-orange-500">Search</h4>
        <input
          type="text"
          onChange={(e) => setSearchFilter(e.target.value)}
          className="py-1 px-5 mx-2 w-1/2"
        />
        <button
          onClick={() =>
            executeSearch({
              variables: { filter: searchFilter },
            })
          }
          className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-4 rounded "
        >
          OK
        </button>
      </div>
      {data &&
        data.feed.links.map((link, index) => (
          <Link key={link.id} link={link} index={index} />
        ))}
    </>
  );
};

export default Search;
