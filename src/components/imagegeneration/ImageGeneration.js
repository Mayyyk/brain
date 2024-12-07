import React from 'react';
import './ImageGeneration.css';

const ImageGeneration = ({ imageUrl, isLoading }) => {
	return (
		<div className='image-generation'>
			<div className='image-container'>
				{isLoading && <div className="loading">Generating image...</div>}
				{!isLoading && imageUrl && <img src={imageUrl} alt='AI Generated' />}
				{!isLoading && !imageUrl && <div className="no-image">No image generated yet</div>}
			</div>
		</div>
	);
};

export default ImageGeneration;
