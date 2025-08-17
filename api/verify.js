export default async (req, res) => {
  // Validate request method
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { key } = req.query;

  try {
    // Call your PythonAnywhere endpoint
    const pyResponse = await fetch(
      `https://broextinsionwant.pythonanywhere.com/verify_license?key=${key}`,
      {
        headers: {
          'Authorization': `Bearer ${process.env.PYTHONANYWHERE_SECRET}`
        }
      }
    );

    if (!pyResponse.ok) {
      throw new Error('License server error');
    }

    const data = await pyResponse.json();

    // Return standardized response
    res.status(200).json({
      valid: data.is_valid || false,
      license: key,
      expires: data.expiry_date || null,
      features: data.features || []
    });

  } catch (error) {
    res.status(500).json({
      error: 'License verification failed',
      details: error.message
    });
  }
};
