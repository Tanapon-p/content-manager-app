import Layout from "@/components/Layout";
import ResourceForm from "@/components/ResourceForm";
import { ErrorAlert, SuccessAlert } from "@/components/alert/sweetAlert";
import axios from "axios";
import { useRouter } from "next/router";

const ResourceCreate = () => {
  const router = useRouter();

  const createResource = (formData) => {
    axios
      .post("/api/resources", formData)
      .then((response) => {
        if (response.status === 200) {
          SuccessAlert("Create Success");
          router.push("/");
        } else {
          alert("An error occurred");
        }
      })
      .catch((err) => ErrorAlert(err?.response?.data));
  };

  return (
    <Layout>
      <div className="container">
        <div className="columns">
          <div className="column is-8 is-offset-2">
            <ResourceForm
              onFormSubmit={createResource}
              formTitle="Add Resource"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default ResourceCreate;
