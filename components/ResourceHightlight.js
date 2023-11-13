import Link from "next/link";
import ResourceLabel from "./ResourceLabel";
import moment from "moment";

const ResourceHightlight = ({ resources }) => {
  return (
    <section className="hero ">
      <div className="hero-body">
        <div className="container">
          {resources.map((resource) => (
            <section key={resource.id} className="section">
              <div className="columns">
                <div className="column is-8 is-offset-2">
                  <div className="content is-medium">
                    <h2 className="subtitle is-4">
                      {moment(resource.createdAt).format("LLL")}{" "}
                      <ResourceLabel status={resource.status} />
                    </h2>
                    <h1 className="title">{resource.title}</h1>
                    <p className="mb-0">{resource.description}</p>
                    <Link legacyBehavior href={`/resources/${resource.id}`}>
                      <a className="button is-light">Details</a>
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResourceHightlight;