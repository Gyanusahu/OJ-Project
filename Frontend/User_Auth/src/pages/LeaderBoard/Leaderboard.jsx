import React, { useEffect, useState } from "react";
import httpAction from "../../utils/httpAction";
import apis from "../../utils/apis";
import 'bootstrap/dist/css/bootstrap.min.css';
import Headers from "../../components/Headers/Headers";
import Footer from "../../components/Footers/Footer";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  // Function to assign ranks (same submission => same rank)
  const assignRanks = (users) => {
    let ranked = [];
    let rank = 1;

    for (let i = 0; i < users.length; i++) {
      if (i > 0 && users[i].submission === users[i - 1].submission) {
        ranked.push({ ...users[i], rank: ranked[i - 1].rank });
      } else {
        ranked.push({ ...users[i], rank });
      }
      rank = ranked.length + 1;
    }
    return ranked;
  };

  useEffect(() => {
    const fetchData = async () => {
      // Get leaderboard
      const leaderboardData = await httpAction({ url: apis().getLeaderboard });
      // Get current user
      const userData = await httpAction({ url: apis().userProfile });

      if (leaderboardData?.status && userData?.status) {
        const ranked = assignRanks(leaderboardData.leaderboard);
        setLeaderboard(ranked);
        setCurrentUser(userData.user);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Headers />
      <div className="container mt-5">
        <h2 className="mb-4 text-center">🏆 Leaderboard</h2>
        <div className="table-responsive">
          <table className="table table-striped table-hover table-bordered text-center align-middle">
            <thead className="table-dark">
              <tr>
                <th>🏅 Rank</th>
                <th>👤 Name</th>
                <th>📧 Email</th>
                <th>📈 Submissions</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((user) => {
                const isCurrentUser = currentUser?.email === user.email;
                return (
                  <tr
                    key={user.email}
                    className={isCurrentUser ? "table-success fw-bold" : ""}
                  >
                    <td>#{user.rank}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <span className="badge bg-primary">
                        {user.submission}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Leaderboard;
