// import image from '../images/graph.png'
import { useRouter } from "next/router";

export default function JoinUs() {
  const router = useRouter();

  return (
    <section className="joinUs">
      <img className="background-graph" src="graph.png" alt="graph" />
      <div className="gradient-div" />
      <div className="container">
        <div
          className="head-wrapper"
          data-sal="fade"
          data-sal-duration="900"
          data-sal-delay="200"
        >
          <span className="title">Get Early Access</span>
          <h3>
            Join our Open Beta and help us impact the future of realtime
            management
          </h3>
          <button
            type="button"
            className={"btn-with-arrow"}
            onClick={() => router.push("/auth")}
          >
            Early Access
          </button>
        </div>
      </div>
    </section>
  );
}
