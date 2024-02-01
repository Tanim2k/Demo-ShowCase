import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const isAdmin = localStorage.getItem('role') === 'ADMIN';

  return (
    <div style={{ backgroundImage: `url('https://img.freepik.com/free-photo/abstract-digital-grid-black-background_53876-97647.jpg?w=1060&t=st=1697967594~exp=1697968194~hmac=3e9e5479b8c5a9ae923ab6ca6d826869e3e67eb834dbabc244853d98517e846f')`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh' }}>
      <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="row">
          <div className="col-md-4">
            <div className="card">
              <img src="https://st3.depositphotos.com/3591429/13572/i/450/depositphotos_135721568-stock-photo-woman-writing-in-notebook.jpg" className="card-img-top" alt="Book Image" />
              <div className="card-body">
                <h5 className="card-title">Create Tasks</h5>
                <p className="card-text">Insert Your Tasks Here</p>
                <Link to="/create" className="btn btn-primary">Insert</Link>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <img src="https://thumbs.dreamstime.com/b/man-writing-checkmark-to-checklist-blackboard-document-finished-work-completed-tasks-chalkboard-check-list-planning-137658477.jpg" className="card-img-top" alt="Book Image" />
              <div className="card-body">
                <h5 className="card-title">View Your Tasks</h5>
                <p className="card-text">View All Your Tasks</p>
                <Link to="/myTasks" className="btn btn-primary">Open List</Link>
              </div>
            </div>
          </div>
      
          {isAdmin && (
            <div className="col-md-4">
              <div className="card">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSL90EJKJ8EjWACLsOZrr7EWBXw6DGhqfRk-A&usqp=CAU" className="card-img-top" alt="Book Image" />
                <div className="card-body">
                  <h5 className="card-title">View All Tasks</h5>
                  <p className="card-text">See All Users Tasks</p>
                  <Link to="/allTasks" className="btn btn-primary">Visist</Link>
                </div>
              </div>
            </div>
          )}
     
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
