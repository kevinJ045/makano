import { useEffect, useRef, useState } from "react";



export default function ScriffLogo({
  width,
  height,
  scale = '1',
  scale2 = '1',
  closeEyes = false
}: {
  width: string | number,
  height: string | number,
  scale?: string | number,
  scale2?: string | number,
  closeEyes?: boolean
}) {
  const [leftEyeClosed, setLeftEyeClosed] = useState(closeEyes);
  const [rightEyeClosed, setRightEyeClosed] = useState(closeEyes);


  const logoRef = useRef<HTMLDivElement>(null);
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });

  // Listen for mouse movement
  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      if (!logoRef.current) return;
      const rect = logoRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;

      // Normalize and limit eye movement
      const maxOffset = 4; // maximum pixel offset
      const distance = Math.sqrt(dx * dx + dy * dy);
      const ratio = Math.min(maxOffset / distance, 1);

      setEyeOffset({
        x: dx * ratio,
        y: dy * ratio
      });
    }

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (<div ref={logoRef} onMouseDownCapture={() => {
    setLeftEyeClosed(true);
    setRightEyeClosed(true);
  }} onMouseUpCapture={() => {
    setLeftEyeClosed(false);
    setRightEyeClosed(false);
  }} className="logo-scriff" style={{
    width: `${width}`,
    height: `${height}`,
    overflow: 'hidden',
    transform: `scale(${scale2 || '1'})`,
    '--scale-1': scale2 || '1'
  } as any}>
    <svg viewBox="1300 -250 400 400" style={{
      width: '100%',
      height: '100%',
      transform: "scale(" + scale + ")"
    }}>
      <g
        x="0"
        y="0"
        id="gLogo">
        <path
          id="horn-left"
          className="horn"
          d="m 1318.9306,-216.76464 c -0.6876,-0.004 -0.8517,1.04129 -0.4025,3.3538 l 14.4611,74.45645 19.6768,-14.86628 22.086,11.64993 c -24.0875,-29.03816 -51.2941,-74.56607 -55.8214,-74.5939 z"
          style={{ 'fill': '#f38ba8' }} />
        <path
          id="horn-right"
          className="horn"
          d="m 1554.7503,-217.11648 c -4.4397,0.0285 -30.6623,43.65263 -54.3977,72.732 l 18.5575,-9.78855 21.4664,16.21864 14.7764,-75.80881 c 0.4507,-2.31222 0.2863,-3.3577 -0.4026,-3.35328 z"
          style={{ 'fill': '#f38ba8' }} />
        <path
          id="face"
          d="m 1352.6913,-152.34284 -19.6458,14.84252 25.4827,131.2012859 c 3.0789,15.85198 10.5558,30.0604801 22.1749,38.1919901 l 25.7085,28.64269 c 9.9117,-2.97815 19.1987,-4.07366 27.4086,-4.11499 11.9836,-0.0603 21.6461,2.1164 27.6418,3.94393 l 33.0646,-29.67725 c 0.126,-0.11303 0.2487,-0.2282 0.3726,-0.34261 10.4377,-8.31625 17.209,-21.7556201 20.1109,-36.6437601 l 25.3101,-129.8489259 -21.4354,-16.19488 -18.9575,9.99887 c -11.7085,14.27639 -22.775,24.91994 -30.2741,24.91994 h -65.7681 c -7.1671,0 -17.5809,-9.72669 -28.6933,-23.05079 z"
          style={{ 'fill': '#1e1e2e' }} />
        <path
          id="chin"
          d="m 1433.6854,56.673356 c -8.1165,0.0542 -17.2888,1.1448 -27.0805,4.07726 l 0.9699,1.08109 c 12.9159,14.38997 34.8985,15.57671 49.2885,2.66081 l 4.3749,-3.9269 c -5.9903,-1.81858 -15.623,-3.97197 -27.5528,-3.89226 z"
          style={{ 'fill': '#f38ba8' }} />
        <g transform={`translate(${eyeOffset.x}, ${eyeOffset.y})`}>
          <path
            id="eye-left"
            className="eye"
            d={
              leftEyeClosed ? 'm 1410.041,-52.43607 c -2.2855,-0.78574 -2.8908,-1.4159 -4.2327,-4.40667 -2.6176,-5.8338 -8.9012,-8.37817 -14.4633,-5.85653 -2.7409,1.2426 -3.8038,2.35328 -5.5405,5.78967 -1.7216,3.40656 -3.3944,4.69829 -6.0843,4.69829 -3.6047,0 -6.2059,-2.87788 -5.8062,-6.42375 0.7037,-6.24382 7.4195,-13.49707 14.7989,-15.9834 5.6828,-1.91467 13.0094,-1.15525 18.3898,1.90618 5.2491,2.98672 10.5625,10.3012 10.5625,14.54036 0,4.22573 -3.769,7.0612 -7.6242,5.73585 z' : 'm 1387.041,-30.466624 c 5.8123,6.48555 15.7817,7.03132 22.2672,1.219 6.4856,-5.8123 4.0424,-30.32992 -1.7699,-36.81547 -5.8123,-6.48556 -15.7817,-7.03133 -22.2673,-1.21901 -6.4855,5.8123 -4.0423,30.32992 1.77,36.81548 z'
            }
            style={{ 'fill': '#f38ba8' }}
          />
          <path
            d={
              rightEyeClosed ? 'm 1487.3866,-52.43607 c -2.2855,-0.78574 -2.8908,-1.4159 -4.2327,-4.40667 -2.6176,-5.8338 -8.9012,-8.37817 -14.4633,-5.85653 -2.7409,1.2426 -3.8038,2.35328 -5.5405,5.78967 -1.7216,3.40656 -3.3944,4.69829 -6.0843,4.69829 -3.6047,0 -6.2059,-2.87788 -5.8062,-6.42375 0.7037,-6.24382 7.4195,-13.49707 14.7989,-15.9834 5.6828,-1.91467 13.0094,-1.15525 18.3898,1.90618 5.2491,2.98672 10.5625,10.3012 10.5625,14.54036 0,4.22573 -3.769,7.0612 -7.6242,5.73585 z' : 'm 1485.581,-30.466624 c -5.8123,6.48555 -15.7817,7.03132 -22.2673,1.219 -6.4855,-5.8123 -4.0423,-30.32992 1.77,-36.81547 5.8123,-6.48556 15.7817,-7.03133 22.2672,-1.21901 6.4856,5.8123 4.0424,30.32992 -1.7699,36.81548 z'
            }
            style={{ 'fill': '#f38ba8' }}
            id="eye-right"
            className="eye"
          />
        </g>
      </g>
    </svg>
  </div>)
}