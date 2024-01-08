import FadeIn from "./FadeIn";
import Logo from "./Logo";

const LoadingLogo = () => {
  return (
    <div className="center-empty-page">
      <div className="center-empty-page--box">
        <FadeIn>
          <Logo />
        </FadeIn>
      </div>
    </div>
  );
};
export default LoadingLogo;
