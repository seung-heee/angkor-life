import React from 'react';

const Profile = () => {
  // vote/cantidate/{id}

  return (
    <div>
      <img src="" alt="" />

      <div>
        {/* 후보자 기본 정보 */}
        <div>
          <p>name</p>
          <p></p>
        </div>

        {/* 후보자 상세 정보 - 컴포넌트 */}
        <article>
          <div>Education</div>
          <div>Major</div>
          <div>Hobbies</div>
          <div>Talent</div>
          <div>Ambition</div>
        </article>
      </div>

      <button>Voted</button>
    </div>
  );
};

export default Profile;
