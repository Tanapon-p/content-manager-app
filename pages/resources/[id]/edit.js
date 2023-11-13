import Layout from "components/Layout";
import ResourceForm from "@/components/ResourceForm";
import axios from "axios";
import { SuccessAlert } from "@/components/alert/sweetAlert";
import { useRouter } from "next/router";

const ResourceEdit = ({ resource, params }) => {
  const router = useRouter();
  const updateResource = (formData) => {
    axios
      .patch("/api/resources", formData)
      .then((_) => SuccessAlert("Updated Success"))
      .catch((err) => alert(err?.response?.data));
    router.push(`/resources/${router.query.id}`);
  };

  console.log(router.query.id);
  return (
    <Layout>
      <div className="container">
        <div className="columns">
          <div className="column is-8 is-offset-2">
            <ResourceForm
              initialData={resource}
              onFormSubmit={updateResource}
              formTitle="Edit Resource"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps({ params }) {
  const dataRes = await fetch(`${process.env.API_URL}/resources/${params.id}`);
  const data = await dataRes.json();

  return {
    props: {
      resource: data,
    },
  };
}

export default ResourceEdit;
