import { forwardRef } from "react";
import "./Story.css";

const Story = forwardRef((props, ref) => {
  return (
    <div className="story-container" ref={ref}>
      <div className="title">세계관 스토리</div>
      <div className="story">
        <div>지구로부터 멀리 떨어진 고양이 별의 고양이 왕국</div>
        <br />
        <div>그 곳에는 모든 고양이들이</div>
        <div>평화롭게 살아가는 왕국이</div>
        <div>존재하고 있었다.</div>
        <br />
        <div>어느날,</div>
        <div>고양이 왕국의 왕이 갑작스럽게 죽은 뒤</div>
        <div>왕의 유서가 공개되었는데...</div>
        <br />
        <div>
          &quot;용맹한 6마리의 고양이 중 가장 강한 고양이가 다음 왕이 될
          것이다&quot;
        </div>
        <br />
        <div>고양이 왕국의 왕이 되기 위한</div>
        <div>6마리 고양이의</div>
        <div>생선 튀기는 싸움이 시작된다!</div>
      </div>
      <div>
        <img className="cat-image" src="./images/cat.png" alt="" />
      </div>
    </div>
  );
});

Story.displayName = "Story";

export default Story;
