import React from 'react';
import UpdateList from './UpdateList';
import DeleteList from './DeleteList';
import "bootstrap/dist/css/bootstrap.min.css";

function Lists(props) {
    const { alldata, updateList, handleChange } = props;

    return (
        <table className='table table-striped'>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Update</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {alldata.map(item => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.title}</td>
                        <td>{item.author}</td>
                        <td>
                            <UpdateList
                                item={item} // Pass the data of the specific item being updated
                                updateList={updateList}
                                handleChange={handleChange}
                            />
                        </td>
                        <td>
                            <DeleteList
                                elementId={item.id}
                                singledata={props.singledata}
                                getList={props.getList}
                                deleteList={props.deleteList}
                            />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default Lists;
