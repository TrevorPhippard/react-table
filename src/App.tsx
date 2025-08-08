import "./App.css";
import { Table } from "./components/Table/index";
import { createMockUsers } from "./utils/fakes";
import { useColumns } from "./hooks/useColumns";

const data = createMockUsers(500);

function App() {
  return <Table data={data} columns={useColumns()} />;
}

export default App;
