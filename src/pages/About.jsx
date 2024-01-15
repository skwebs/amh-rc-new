import axios from "axios";
import { useEffect, useState } from "react";

const About = () => {
  const [user, setUser] = useState({});

  const userData = async () => {
    const res = await fetch("api/auth/user", {
      headers: {
        Authorization:
          "Bearer 6|QZYBnWCm83J3j2KWL7MQimE3UOdbF38IyojeNMmZcdbbaf9d",
      },
    });
    const user = await res.json();
    setUser(user);
    console.log(user);
  };

  useEffect(() => {
    userData();
  }, []);

  // ============================================
  function axiosUserData() {
    axios
      .get("api/auth/user", {
        headers: {
          Authorization:
            "Bearer 6|QZYBnWCm83J3j2KWL7MQimE3UOdbF38IyojeNMmZcdbbaf9d",
        },
      })
      .then((response) => {
        console.log(response.data);
        setUser(response.data);
      });
  }

  useEffect(() => {
    userData();
    axiosUserData();
  }, []);
  // ============================================

  // @ts-ignore
  return <div>{user && user?.name ? <>{user?.name}</> : <>Loading</>}</div>;
};
export default About;
