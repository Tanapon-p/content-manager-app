import React from "react";

function ResourceLabel({ status }) {
  return <span class={`tag is-large ml-4 resource-${status}`}>{status}</span>;
}

export default ResourceLabel;
