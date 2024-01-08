import { visual } from "../../assets/data";
import { FadeIn, VisualImagesBox, GoToTop } from "../../components";

const Visual = () => {
  return (
    <>
      <FadeIn delay={0.3}>
        <div className="center-empty-page">
          <div className="center-empty-page__box">
            <h1 className="heading-1">VISUAL</h1>
            <h4 className="heading-4">{visual.title}</h4>
          </div>
        </div>
      </FadeIn>
      <div className="section-container visual-page__main">
        <div className="visual-page__imgs">
          {visual?.visualSections?.map((sec, i) => {
            const isOdd = (number) => number % 2 !== 0;
            if (isOdd(i + 1))
              return (
                <FadeIn key={i} delay={0.5} direction="up">
                  <>
                    <VisualImagesBox autoSlide={true}>
                      {sec.map((img, i) => {
                        return (
                          <FadeIn isVisual key={i}>
                            <img
                              key={i}
                              className="visual-page__img"
                              src={img}
                              alt="visual photo"
                            />
                          </FadeIn>
                        );
                      })}
                    </VisualImagesBox>

                    <h1 className="visual-page__num">
                      {i + 1 > 9 ? i + 1 : `0${i + 1}`}
                    </h1>
                  </>
                </FadeIn>
              );
          })}
        </div>

        <div className="visual-page__imgs visual-page__imgs--right">
          {visual?.visualSections?.map((sec, i) => {
            const isOdd = (number) => number % 2 !== 0;
            if (!isOdd(i + 1))
              return (
                <FadeIn key={i} delay={0.5} direction="down">
                  <>
                    <VisualImagesBox autoSlide={true}>
                      {sec.map((img, i) => {
                        return (
                          <FadeIn isVisual key={i}>
                            <img
                              key={i}
                              className="visual-page__img"
                              src={img}
                              alt="visual photo"
                            />
                          </FadeIn>
                        );
                      })}
                    </VisualImagesBox>

                    <h1 className="visual-page__num">
                      {i + 1 > 9 ? i + 1 : `0${i + 1}`}
                    </h1>
                  </>
                </FadeIn>
              );
          })}
        </div>
      </div>
      <div className="visual-page__sub">
        {visual?.visualSections?.map((sec, i) => {
          const isOdd = (number) => number % 2 !== 0;
          if (isOdd(i + 1))
            return (
              <FadeIn key={i} delay={0.3} direction="up">
                <div className="visual-page__sub-imgs--left">
                  <div>
                    <VisualImagesBox autoSlide={true}>
                      {sec.map((img, i) => {
                        return (
                          <FadeIn isVisual key={i}>
                            <img
                              key={i}
                              className="visual-page__img"
                              src={img}
                              alt="visual photo"
                            />
                          </FadeIn>
                        );
                      })}
                    </VisualImagesBox>

                    <h1 className="visual-page__num">
                      {i + 1 > 9 ? i + 1 : `0${i + 1}`}
                    </h1>
                  </div>
                </div>
              </FadeIn>
            );

          if (!isOdd(i + 1))
            return (
              <FadeIn key={i} delay={0.4} direction="down">
                <div className="visual-page__sub-imgs--right">
                  <>
                    <VisualImagesBox autoSlide={true}>
                      {sec.map((img, i) => {
                        return (
                          <FadeIn isVisual key={i}>
                            <img
                              key={i}
                              className="visual-page__img"
                              src={img}
                              alt="visual photo"
                            />
                          </FadeIn>
                        );
                      })}
                    </VisualImagesBox>

                    <h1 className="visual-page__num">
                      {i + 1 > 9 ? i + 1 : `0${i + 1}`}
                    </h1>
                  </>
                </div>
              </FadeIn>
            );
        })}
      </div>
      <GoToTop />
    </>
  );
};
export default Visual;
