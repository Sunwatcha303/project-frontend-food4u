import { CardList } from "../components/CardList";
import { TopicList } from "../components/TopicList";
import data from "../data/recipes_data";
import { useParams } from "react-router-dom";

function Article() {
  const { tags } = useParams();

  const recipes = data.recipes.filter((item) => item.tags == tags);
  const topic = data.topics.find((item) => item.tags == tags);

  return (
    <div>
      <h2 className="mb-4">{topic.title}</h2>
      <CardList recipes={recipes} />
      <TopicList topics={data.topics} />
    </div>
  );
}

export default Article;
