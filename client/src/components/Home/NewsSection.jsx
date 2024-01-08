import FadeIn from "../Helpers/FadeIn";
import Accordion from "../Helpers/Accordion";
import { news } from "../../assets/data";

const News = () => {
  return (
    <div className="section-container home__news mt-lg mb-lg">
      <FadeIn delay={0.3} direction="right">
        {news.map((section, index) => (
          <Accordion key={index} section={section} />
        ))}
      </FadeIn>
    </div>
  );
};
export default News;
