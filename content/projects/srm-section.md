---
title: "SRM Visualization"
type: "project"
date: 2026-11-07
summary: "Animated section view of a solid rocket motor's aft end, from ignition to burnout."
external_link: "/viz/srm-section/"
badge: "Visualization"
---

An animated 2D section through the aft end of a solid rocket motor: propellant grain, aft closure, and a nozzle with approach, throat and exit cone. The motor runs from ignition through burnout. Particles trace combustion gas from the burning surface through the throat and out the exit cone, colored by static temperature.

<iframe id="srm-viz" src="/viz/srm-section/#embed" title="Solid rocket motor section animation" style="width:100%;height:1100px;border:0;display:block;margin:1.5rem 0;" loading="lazy"></iframe>
<script>
addEventListener('message', function (e) {
  if (e.origin === location.origin && e.data && e.data.srmHeight) {
    document.getElementById('srm-viz').style.height = e.data.srmHeight + 'px';
  }
});
</script>
