import axios from "axios";
import moment from "moment";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ErrorAlert, SuccessAlert } from "./alert/sweetAlert";
import { useRouter } from "next/router";

function ActiveResource() {
  const [resource, setResource] = useState({});
  const [seconds, setSeconds] = useState();
  const router = useRouter();
  useEffect(() => {
    async function fetchResource() {
      const axiosRes = await axios.get("/api/activeresource");
      const resource = axiosRes.data;
      const timeToFinish = parseInt(resource.timeToFinish, 10);
      const elapsedTime = moment().diff(
        moment(resource.activationTime),
        "seconds"
      );
      const updatedTimeToFinish = timeToFinish * 60 - elapsedTime;

      if (updatedTimeToFinish >= 0) {
        resource.timeToFinish = updatedTimeToFinish;
        setSeconds(updatedTimeToFinish);
      }

      setResource(resource);
    }
    fetchResource();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(seconds - 1);
    }, 1000);

    if (seconds < 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [seconds]);

  const completeResource = () => {
    axios
      .patch("/api/resources", { ...resource, status: "complete" })
      .then((_) => SuccessAlert("Your task is done!"))
      .catch((_) => alert("Cannot complete the resource!"));
    router.push("/");
  };

  const hasResource = resource && resource.id;

  function handleClick() {
    ErrorAlert("No Resource Active", "please Active some resource");
  }

  return (
    <div className="active-resource">
      <h1 className="resource-name">
        {hasResource ? resource.title : "No Resource Active"}
      </h1>
      <div className="time-wrapper">
        {hasResource &&
          (seconds > 0 ? (
            <h2 className="elapsed-time">{seconds}</h2>
          ) : (
            <h2 className="elapsed-time">
              <button onClick={completeResource} className="button is-success">
                Click and Done!
              </button>
            </h2>
          ))}
      </div>

      {hasResource ? (
        <Link legacyBehavior href={`/resources/${resource.id}`}>
          <a className="button">Go to resource</a>
        </Link>
      ) : (
        <Link legacyBehavior href="/">
          <a onClick={() => handleClick()} className="button">
            Go to resource
          </a>
        </Link>
      )}
    </div>
  );
}

export default ActiveResource;
