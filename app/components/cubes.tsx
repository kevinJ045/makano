
export default function CubesScene() {

  return (
    <div className="scene">
      {[1, 2, 3].map((n) => (
        <div className={`shape shape--${n} z-${10 + n}`} key={n}>
          <div className="cubes">
            <div className="rotate">
              {[1, 2, 3, 4].map((i) => (
                <div className={`cube cube--${i}`} key={i}>
                  {['front', 'back', 'top', 'down', 'left', 'right'].map((face) => (
                    <div className={`${face} side`} key={face}>
                      {`${i}${face[0]}`}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}

      <div className="shape shape--shadow">
        <div className="rotate">
          <div className="shadow">shadow</div>
        </div>
      </div>

    </div>
  );
}
