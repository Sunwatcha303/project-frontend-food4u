import { CardList } from "../components/CardList";
import { TopicList } from "../components/TopicList";
import data from "../data/recipes_data";

function Home() {
  return (
    <div>
      <h2 className="mb-4">บทความที่ได้รับความนิยมสูงสุด</h2>
      <CardList recipes={data.recipes} />
      <TopicList topics={data.topics} />
    </div>
  );
}

export default Home;
