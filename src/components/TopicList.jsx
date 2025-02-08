/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';

export const TopicList = ({ topics }) => {
  return (
    <div className="mt-4">
      <h2 className="mb-3">หัวข้อแนะนำ</h2>
      <ul className="list-group">
        {topics.map((topic, index) => (
          <li key={index} className="list-group-item">
            <Link to={topic.link} className="text-decoration-none">
              {topic.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
