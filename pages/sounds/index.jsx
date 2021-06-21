import { useState, useEffect } from 'react';

import { Link } from 'components';
import { userService } from 'services';

export default Index;

function Index() {
    const [sounds, setSounds] = useState(null);

    useEffect(() => {
        userService.getAll().then(x => setSounds(x));
    }, []);

    function deleteSound(id) {
        setSounds(sounds.map(x => {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
        userService.delete(id).then(() => {
            setSounds(sounds => sounds.filter(x => x.id !== id));
        });
    }

    return (
        <div>
            <h1>Sounds</h1>
            <Link href="/sounds/add" className="btn btn-sm btn-success mb-2">Add Sound</Link>
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
                    {sounds && sounds.map(sound =>
                        <tr key={sound.id}>
                            <td>{sound.title} {sound.firstName} {sound.lastName}</td>
                            <td>{sound.email}</td>
                            <td>{sound.role}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link href={`/sounds/edit/${sound.id}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
                                <button onClick={() => deleteSound(sound.id)} className="btn btn-sm btn-danger btn-delete-user" disabled={sound.isDeleting}>
                                    {sound.isDeleting 
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Delete</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {!sounds &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="spinner-border spinner-border-lg align-center"></div>
                            </td>
                        </tr>
                    }
                    {sounds && !sounds.length &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="p-2">No Sounds To Display</div>
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
