import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const scrollSkewEffect = (cl: number) => {
  let proxy = { skew: 0 },
    skewSetter = gsap.quickSetter(".skewElem", "skewY", "deg"), // fast
    clamp = gsap.utils.clamp(-cl, cl); // don't let the skew go beyond 20 degrees. 

  ScrollTrigger.create({
    onUpdate: (self) => {
      let skew = clamp(self.getVelocity() / 300);
      // only do something if the skew is MORE severe. Remember, we're always tweening back to 0, so if the user slows their scrolling quickly, it's more natural to just let the tween handle that smoothly rather than jumping to the smaller skew.
      if (Math.abs(skew) > Math.abs(proxy.skew)) {
        proxy.skew = skew;
        gsap.to(proxy, {skew: 0, duration: 2, ease: "power3", overwrite: true, onUpdate: () => skewSetter(proxy.skew)});
      }
    }
  });
}

export default scrollSkewEffect;
