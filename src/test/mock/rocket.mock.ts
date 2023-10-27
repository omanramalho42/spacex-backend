const mockRocket = {
  rocket_id: "falcon1",
  rocket_name: "Falcon 1",
  rocket_type: "Merlin A",
  first_stage: {
    cores: [
      {
        core_serial: "Merlin-1A",
        flight: 1,
        block: null,
        reused: false,
        land_success: false,
        landing_intent: false,
        landing_type: null,
        landpad: null
      }
    ]
  },
  second_stage: {
    block: 1,
    payloads: [
      {
        payload_id: "FalconSAT-2",
        norad_id: [],
        reused: false,
        customers: ["DARPA"],
        nationality: "United States",
        manufacturer: "SSTL",
        payload_type: "Satellite",
        payload_mass_kg: 20,
        payload_mass_lbs: 43,
        orbit: "LEO",
        orbit_params: { apoapsis_km: 400, periapsis_km: 400, inclination_deg: 39, period_min: 90.7 }
      }
    ]
  },
  fairings: {
    reused: false,
    recovery_attempt: false,
    recovered: false,
    ship: null
  }
};

export default mockRocket;
