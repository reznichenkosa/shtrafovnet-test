import { createServer } from "miragejs";
import mockData from "./mock-data.json";

export const createMockServer = () => {
  createServer({
    routes() {
      this.get("/api/customers", () => mockData);
      this.post("/api/customers", (schema, request) => {
        const data = JSON.parse(request.requestBody);
        return data;
      });
    },
  });
};
