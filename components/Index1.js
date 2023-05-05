import React, { useState } from 'react';

function Index1() {
  const [issues, setIssues] = useState([]);
  const [currentIssue, setCurrentIssue] = useState({
    id: '',
    title: '',
    description: '',
    status: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentIssue({ ...currentIssue, [name]: value });
  };

  const handleAddIssue = (event) => {
    event.preventDefault();
    if (!currentIssue.title || !currentIssue.description || !currentIssue.status) {
      return;
    }
    const newIssue = {
      id: new Date().getTime(),
      title: currentIssue.title,
      description: currentIssue.description,
      status: currentIssue.status,
    };
    setIssues([...issues, newIssue]);
    setCurrentIssue({
      id: '',
      title: '',
      description: '',
      status: '',
    });
  };

  const handleEditIssue = (event) => {
    event.preventDefault();
    if (!currentIssue.title || !currentIssue.description || !currentIssue.status) {
      return;
    }
    const updatedIssues = issues.map((issue) => {
      if (issue.id === currentIssue.id) {
        return currentIssue;
      }
      return issue;
    });
    setIssues(updatedIssues);
    setCurrentIssue({
      id: '',
      title: '',
      description: '',
      status: '',
    });
  };

  const handleDeleteIssue = (id) => {
    const updatedIssues = issues.filter((issue) => issue.id !== id);
    setIssues(updatedIssues);
  };

  const handleEditButtonClick = (id) => {
    const issueToEdit = issues.find((issue) => issue.id === id);
    setCurrentIssue(issueToEdit);
  };

  return (
    <div>
      <h1>Issue Board</h1>
      <form onSubmit={currentIssue.id ? handleEditIssue : handleAddIssue}>
        <input type="text" placeholder="Title" name="title" value={currentIssue.title} onChange={handleInputChange} /><br/>
        <input type="text" placeholder="Description" name="description" value={currentIssue.description} onChange={handleInputChange} /><br/>
        <select class='one' name="status" value={currentIssue.status} onChange={handleInputChange}>
          <option value="">Select Status</option>
          <option value="New">New</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
        </select>
        <button class='one'type="submit">{currentIssue.id ? 'Update' : 'Add'}</button>
        <button class='one' type="button" onClick={() => setCurrentIssue({ id: '', title: '', description: '', status: '' })}>Cancel</button>
      </form>
      <table className='apple'>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
       
        <tbody>
          {issues.map((issue) => (
            <tr key={issue.id}>
              <td>{issue.title}</td>
              <td>{issue.description}</td>
              <td>{issue.status}</td>
              <td>
                <button className='one' type="button" onClick={() => handleEditButtonClick(issue.id)}>Edit</button>
                <button className='one' type="button" onClick={() => handleDeleteIssue(issue.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
     </table>
     </div>
  );
}
export default Index1;
