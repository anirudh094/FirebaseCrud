import StartFirebase from "../firebaseConfig/index";
import React from "react";
import { ref, onValue } from "firebase/database";
import "./index.css";

const db = StartFirebase();

export class RealtimeData extends React.Component {
  constructor() {
    super();
    this.state = {
      tableData: [],
    };
  }

  componentDidMount() {
    const dbref = ref(db, "Students");

    onValue(dbref, (snapshot) => {
      let records = [];
      snapshot.forEach((childSnapshot) => {
        let keyName = childSnapshot.key;
        let data = childSnapshot.val();
        records.push({ key: keyName, data: data });
      });
      this.setState({ tableData: records });
    });
  }

  render() {
    return (
      <table className="container w-75" bordered striped variant="dark">
        <tr>
          <th>#</th>
          <th>Certificate Id</th>
          <th>Student Name</th>
          <th>Domain</th>
          <th>ProjectName</th>
          <th>Start Date</th>
          <th>End Date</th>
        </tr>

        {this.state.tableData.map((row, index) => {
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{row.key}</td>
              <td>{row.data.StudentName}</td>
              <td>{row.data.Domain}</td>
              <td>{row.data.ProjectName}</td>
              <td>{row.data.TrainingFrom}</td>
              <td>{row.data.TrainingTo}</td>
            </tr>
          );
        })}
      </table>
    );
  }
}
