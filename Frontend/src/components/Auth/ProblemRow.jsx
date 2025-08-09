import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";

const ProblemRow = ({ problem, index, currentPage, limit }) => {
  const navigate = useNavigate();

  const getDifficultyColor = (level) => {
    switch (level) {
      case "Easy":
        return "success";
      case "Medium":
        return "warning";
      case "Hard":
        return "danger";
      default:
        return "secondary";
    }
  };

  return (
    <tr>
      <td>{(currentPage - 1) * limit + index + 1}</td>
      <td>{problem.title}</td>
      <td>
        <Badge bg={getDifficultyColor(problem.difficulty)}>
          {problem.difficulty}
        </Badge>
      </td>
      <td>
        {problem.tags.map((tag, i) => (
          <Badge key={i} className="me-1" bg="secondary">
            {tag}
          </Badge>
        ))}
      </td>
      <td>
        <Button variant="primary" size="sm" onClick={() => navigate(`/problems/${problem._id}`)}>
          Solve Now
        </Button>
      </td>
    </tr>
  );
};

export default ProblemRow;
