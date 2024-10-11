import './style.css';
function PreLoader() {
  return (
    <div className={`acr-preloader`}>
      <div className="acr-preloader-inner ">
        <div className="lds-grid ">
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
        </div>
      </div>
    </div>
  );
}

export default PreLoader;
