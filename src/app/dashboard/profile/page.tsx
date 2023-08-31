"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";

const Profile = () => {
  const { data: session, status } = useSession();

  return (
    <>
      <section>
        <div className="profile_container blur ">
          <h2>Perfil</h2>
          <div className="profile-card">
            <div>
              <Image
                src={"/images/Icons/GenericAvatar.webp"}
                alt="avatar"
                width={100}
                height={100}
              />
            </div>
            <div>
              <h3>Sesion</h3>
              <p>Email: {session?.user?.email}</p>
              <p>Estatus: {status}</p>
              <p>Expira: {session?.expires}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
