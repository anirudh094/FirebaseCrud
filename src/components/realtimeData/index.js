import StartFirebase from '../firebaseConfig/index';
import React from 'react';
import {ref, onValue} from 'firebase/database';
import { Table } from 'react-bootstrap';

const db = StartFirebase();

export class RealtimeData extends React.Component{
    constructor(){
        super();
        this.state = {
            tableData: []
        }
    }
    
    componentDidMount(){
        const dbref = ref(db,'Customer');

        onValue(dbref, (snapshot)=>{
            let records = [];
            snapshot.forEach(childSnapshot=>{
                let keyName = childSnapshot.key;
                let data = childSnapshot.val();
                records.push({"key" : keyName, "data":data});
            });
            this.setState({tableData:records});
        });
    }

    render(){
        return(
            <Table className='container w-75' bordered striped variant='dark'>
                <thread>
                    <tr>
                        <th>#</th>
                        <th>Username</th>
                        <th>Fullname</th>
                        <th>Phonenumber</th>
                        <th>Date of Birth</th>
                        <th>Image</th>
                    </tr>
                </thread>

                <tbody>
                    {this.state.tableData.map((row,index)=>{
                        return(
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{row.key}</td>
                                <td>{row.data.Fullname}</td>
                                <td>{row.data.Phonenumber}</td>
                                <td>{row.data.dateofbirth}</td>
                                <td><img src={row.data.image}></img></td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            
        )
    }
}