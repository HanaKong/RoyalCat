import "./GameDownload.css";

function GameDownlaod() {
  return (
    <div className="game-downlaod-container">
      <div className="sub-container">
        <img src="/images/Royal.png" alt="로고" />
        <button>
          <div 
            onClick={() => {
              window.location.href = "https://drive.google.com/file/d/1mrhTNc1zq4TLyuuWeTRoVXOiNmmkTims/view?usp=sharing";
            }}
          >
            <img src="/images/download.svg" alt="다운로드 이미지" />
            <p>다운로드</p>
          </div>
        </button>
      </div>
    </div>
  );
}
export default GameDownlaod;
