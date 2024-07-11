import React from "react";
import StartFirebase from "../firebaseConfig";
import { ref, set, get, update, remove, child } from "firebase/database";
import "./index.css";

export class Crud extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      db: "",
      CertificateId: "",
      ID: "",
      StudentName: "",
      ProjectName: "",
      Domain: "",
      TrainingFrom: "",
      TrainingTo: "",
    };
    this.interface = this.interface.bind(this);
  }

  componentDidMount() {
    this.setState({
      db: StartFirebase(),
    });
  }

  render() {
    return (
      <>
        <label>Enter CertificateId</label>
        <input
          type="text"
          value={this.state.CertificateId}
          onChange={(e) => {
            this.setState({ CertificateId: e.target.value });
          }}
        />
        <br></br>

        <label>Enter CertificateId</label>
        <input
          type="text"
          value={this.state.ID}
          onChange={(e) => {
            this.setState({ ID: e.target.value });
          }}
        />
        <br></br>

        <label>Enter Student Name</label>
        <input
          type="text"
          value={this.state.StudentName}
          onChange={(e) => {
            this.setState({ StudentName: e.target.value });
          }}
        />
        <br></br>

        <label>Enter Project Name</label>
        <input
          type="text"
          value={this.state.ProjectName}
          onChange={(e) => {
            this.setState({ ProjectName: e.target.value });
          }}
        />
        <br></br>

        <label>Enter Domain</label>
        <input
          type="text"
          value={this.state.Domain}
          onChange={(e) => {
            this.setState({ Domain: e.target.value });
          }}
        />
        <br></br>

        <label>Enter Training From</label>
        <input
          type="date"
          value={this.state.TrainingFrom}
          onChange={(e) => {
            this.setState({ TrainingFrom: e.target.value });
          }}
        />
        <br></br>

        <label>Enter Training To</label>
        <input
          type="date"
          value={this.state.TrainingTo}
          onChange={(e) => {
            this.setState({ TrainingTo: e.target.value });
          }}
        />
        <br></br>

        <button id="addBtn" onClick={this.interface}>
          Add Data
        </button>
        <button id="updateBtn" onClick={this.interface}>
          Update Data
        </button>
        <button id="deleteBtn" onClick={this.interface}>
          Delete Data
        </button>
        <button id="selectBtn" onClick={this.interface}>
          Get date from db
        </button>
      </>
    );
  }

  interface(event) {
    const id = event.target.id;

    if (id === "addBtn") {
      this.insertData();
    } else if (id === "updateBtn") {
      this.updateData();
    } else if (id === "deleteBtn") {
      this.deleteData();
    } else if (id === "selectBtn") {
      this.selectData();
    }
  }

  getAllInputs() {
    return {
      CertificateId: this.state.CertificateId,
      ID: this.state.ID,
      StudentName: this.state.StudentName,
      ProjectName: this.state.ProjectName,
      Domain: this.state.Domain,
      TrainingFrom: this.state.TrainingFrom,
      TrainingTo: this.state.TrainingTo,
    };
  }

  insertData() {
    const db = this.state.db;
    const data = this.getAllInputs();

    set(ref(db, "Students/" + data.CertificateId), {
      ID: data.ID,
      StudentName: data.StudentName,
      ProjectName: data.ProjectName,
      Domain: data.Domain,
      TrainingFrom: data.TrainingFrom,
      TrainingTo: data.TrainingTo,
    })
      .then(() => {
        alert("data was added successfully");
      })
      .catch((error) => {
        alert("there was an error, details: " + error);
      });
  }

  updateData() {
    const db = this.state.db;
    const data = this.getAllInputs();

    update(ref(db, "Students/" + data.CertificateId), {
      ID: data.ID,
      StudentName: data.StudentName,
      ProjectName: data.ProjectName,
      Domain: data.Domain,
      TrainingFrom: data.TrainingFrom,
      TrainingTo: data.TrainingTo,
    })
      .then(() => {
        alert("data is updated successfully");
      })
      .catch((error) => {
        alert("there was an error, details: " + error);
      });
  }

  deleteData() {
    const db = this.state.db;
    const CertificateId = this.getAllInputs().CertificateId;

    remove(ref(db, "Students/" + CertificateId))
      .then(() => {
        alert("data was added successfully");
      })
      .catch((error) => {
        alert("there was an error, details: " + error);
      });
  }

  selectData() {
    const dbref = ref(this.state.db);
    const CertificateId = this.getAllInputs().CertificateId;

    get(child(dbref, "Students/" + CertificateId))
      .then((snapshot) => {
        if (snapshot.exists()) {
          this.setState({
            ID: snapshot.val().ID,
            StudentName: snapshot.val().StudentName,
            ProjectName: snapshot.val().ProjectName,
            Domain: snapshot.val().Domain,
            TrainingFrom: snapshot.val().TrainingFrom,
            TrainingTo: snapshot.val().TrainingTo,
          });
        } else {
          alert("no data found");
        }
      })
      .catch((error) => {
        alert("there was an error, details: " + error);
      });
  }
}
