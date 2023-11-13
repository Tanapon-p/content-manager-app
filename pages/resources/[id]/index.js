import React from "react";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import ResourceLabel from "@/components/ResourceLabel";
import moment from "moment";
import { ErrorAlert, SuccessAlert } from "@/components/alert/sweetAlert";

function ResourceDetail({ resource }) {
  const router = useRouter();
  const activeResource = () => {
    axios
      .patch("/api/resources", { ...resource, status: "active" })
      .then((_) => location.reload())
      .catch((_) => ErrorAlert("Cannot active the resource!", ""));
  };

  function handleDelete(id) {
    axios
      .delete(`/api/resources?id=${id}`)
      .then((_) => SuccessAlert("Delete Success"))
      .catch((err) => alert(err?.response?.data));
    router.push("/");
  }

  return (
    <Layout>
      <section className="hero ">
        <div className="hero-body">
          <div className="container">
            <section className="section">
              <div className="columns">
                <div className="column is-8 is-offset-2">
                  <div className="content is-medium">
                    <h2 className="subtitle is-4">
                      {moment(resource.createdAt).format("LLL")}
                      <ResourceLabel status={resource.status} />
                    </h2>
                    <h1 className="title">{resource.title}</h1>
                    <p>{resource.description}</p>
                    <p>Time to finish: {resource.timeToFinish} min</p>

                    {resource.status === "inactive" && (
                      <>
                        <Link
                          legacyBehavior
                          href={`/resources/${resource.id}/edit`}
                        >
                          <a className="button is-warning">Update</a>
                        </Link>
                        <button
                          onClick={activeResource}
                          className="button is-success ml-1"
                        >
                          Activate
                        </button>
                        <p
                          onClick={() => handleDelete(resource.id)}
                          className="button is-text ml-4"
                        >
                          Delete
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  const dataRes = await fetch(`${process.env.API_URL}/resources/${params.id}`);
  const data = await dataRes.json();

  return {
    props: {
      resource: data,
    },
  };
}

export default ResourceDetail;
