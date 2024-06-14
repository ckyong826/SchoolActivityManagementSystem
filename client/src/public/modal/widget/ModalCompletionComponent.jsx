
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const ModalCompletionComponent = () => {
  return (
    <Box sx={{ width:'90%',height:'75%',overflow:'hidden',overflowY:'scroll' }} className="mt-8 pt-2 px-8 scrollbar-hide" >
      <Typography variant="h3" sx={{color:'black', fontWeight:700, fontFamily:'serif'}}>Git and Github Workshop</Typography>
      <Typography variant="h8" className='pl-2' sx={{color:'grey', fontWeight:400, fontFamily:'serif'}}>22 June 2024 - 24 June 2024</Typography>
      <Typography variant="h4" className='pt-8 ' sx={{color:'black', fontWeight:600, fontFamily:'serif'  }}>Venue</Typography>
      <Typography variant="h8" className='pl-2' sx={{color:'grey', fontWeight:400 , fontFamily:'serif'}}>N28, UTM</Typography>
      <Typography variant="h4" className='pt-8 ' sx={{color:'black', fontWeight:600, fontFamily:'serif'  }}>Description</Typography>
      <Box className='pl-2'>
      <Typography variant="h8" sx={{color:'grey', fontWeight:400 , fontFamily:'serif'}}>
      Introducing the X5000 Ultra Blender – the ultimate kitchen companion for all your blending needs. Engineered with precision and designed for efficiency, the X5000 Ultra Blender boasts a powerful 1200-watt motor that effortlessly crushes ice, blends fruits, and purees vegetables to perfection. Its sleek, modern design is complemented by a robust stainless-steel finish, ensuring durability and style in any kitchen setting.

      Equipped with 10 speed settings and a pulse function, the X5000 provides complete control over your blending consistency, from smooth soups to chunky salsas. The large 64-ounce BPA-free pitcher is perfect for preparing large batches of smoothies, soups, and sauces, making it ideal for families or entertaining guests.

      Safety is paramount with the X5000 Ultra Blender. It features non-slip feet, a secure lid with a convenient pour spout, and an automatic shut-off function to prevent overheating. Cleaning is a breeze with the detachable blades and dishwasher-safe components.

      Experience the versatility and reliability of the X5000 Ultra Blender, and elevate your culinary creations to new heights. Whether you're a seasoned chef or a kitchen novice, this blender is your ticket to delicious and nutritious meals with ease.
      </Typography>
      </Box>
    </Box>
  );
};

export default ModalCompletionComponent;