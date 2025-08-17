
export default async (req, res) => {
  const { key } = req.query;

  if (!key) {
    return res.status(400).json({ error: 'License key required' });
  }

  try {
    // Verify through your API
    const apiResponse = await fetch(
      `${process.env.VERCEL_URL}/api/verify?key=${key}`
    );
    const result = await apiResponse.json();

    if (result.valid) {
      // Success response
      res.status(200).json({
        status: 'active',
        license: key,
        expiry: result.expires,
        features: result.features,
        access_granted: true
      });
    } else {
      // Failed verification
      res.status(403).json({
        status: 'invalid',
        message: 'License verification failed',
        access_granted: false
      });
    }
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error',
      details: error.message
    });
  }
};
