import { Layout } from "../components/Layout";

export const HomePage = (text: string) => (
  <Layout title="Home Page">
    <h1 className="title has-text-primary">{text}</h1>
    <p className="subtitle mt-4">This is crazy</p>
    <p className="subtitle mt-4">This is crazy</p>
  </Layout>
);
