import "../styles/deals.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

function Profile() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const { userToken } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userToken === null) {
      navigate("/");
    }

    axios
      // .get("http://localhost:5000/post")
      .get(`${process.env.REACT_APP_BACKEND_URL}/post`)
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        console.error("Error fetching posts:", err);
      });
  }, [navigate, userToken]);

  const putImage = (imgName) => ({
    backgroundImage: `url(${process.env.REACT_APP_BACKEND_URL}/${imgName})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  });

  const handleBtn = (param) => {
    navigate(`/${param}`);
  };

  return (
    <article className="deals-container">
      <div className="deals-header">
        <div className="deals-title" onClick={() => handleBtn("")}>
          Open Deals
        </div>
      </div>

      <div className="grid-container">
        {posts.map((post) => (
          <section
            key={post.id}
            className="grid-item"
            style={putImage(post.image)}
          >
            <div className="title-container">
              <div className="title-subcontainer">
                <div className="inner-container">
                  <div className="inner-container-title">{post.title}</div>
                  <div className="inner-container-dhs">{post.dhs} Dhs</div>
                  <div className="inner-container-ticket">
                    Ticket - {post.tiket} Dhs
                  </div>
                </div>
              </div>

              <div className="title-subcontainer title-subcontainer-yield-days">
                <div className="title-subcontainer-yield">
                  Yield {post.yield}%
                </div>
                <div className="title-subcontainer-days">
                  Days left {post.days_left}
                </div>
              </div>

              <div className="title-subcontainer ">
                <div className="title-container-sold">Sold {post.sold}%</div>
              </div>
            </div>
          </section>
        ))}
      </div>
    </article>
  );
}

export default Profile;
