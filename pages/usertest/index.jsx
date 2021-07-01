import { useState, useEffect } from 'react';

import { Link } from 'components';
import { userService } from 'services';

export default Index;

function Index() {
    const [usertests, setUserTests] = useState(null);

    useEffect(() => {
        userService.getAll().then(x => setUserTests(x));
    }, []);

    function deleteSound(id) {
        setUserTests(usertests.map(x => {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
        userService.delete(id).then(() => {
            setUserTests(usertests => usertests.filter(x => x.id !== id));
        });
    }

    return (
        <div>
            <h1>User Tests</h1>
            <Link href="/usertest/add" className="btn btn-sm btn-success mb-2">Add User Test</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '20%' }}>User Test No.</th>
                        <th style={{ width: '20%' }}>Sample Name</th>
                        <th style={{ width: '20%' }}>Image Path</th>
                        <th style={{ width: '20%' }}></th>
                        <th style={{ width: '20%' }}>Sound Up</th>
                        <th style={{ width: '20%' }}>Sound Down</th>
                    </tr>
                </thead>
                <tbody>
                    {usertests && usertests.map(usertest =>
                        <tr key={usertest.id}>
                            <td>{usertest.title} {usertest.firstName} {usertest.lastName}</td>
                            <td>{usertest.email}</td>
                            <td>{usertest.role}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link href={`/usertests/edit/${usertest.id}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
                                <button onClick={() => deleteSound(usertest.id)} className="btn btn-sm btn-danger btn-delete-user" disabled={usertest.isDeleting}>
                                    {usertest.isDeleting 
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Delete</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {!usertests &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="spinner-border spinner-border-lg align-center"></div>
                            </td>
                        </tr>
                    }
                    {usertests && !usertests.length &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="p-2">No usertests To Display</div>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}


// TODO: 
// Change AddEdit.jsx import to AddEditSound.jsx for the sounds page. 
// This will allow us to update two separate DB's (Users and Sounds) 

//Edit: Above does not fix the problem with info being added to both sounds. 
