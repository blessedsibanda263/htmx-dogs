import { Layout } from "../components/Layout";

export const DogsPage = () => (
  <Layout title="Dogs Page">
    <main class="section">
      <h1 class="title">Dogs</h1>
      <div
        hx-trigger="revealed, selection-change from:body"
        hx-get="/dogs/form"
      ></div>
      <table hx-get="/dogs/table-rows" hx-target="tbody" hx-trigger="revealed">
        <thead>
          <tr>
            <th>Name</th>
            <th>Breed</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </main>
  </Layout>
);
