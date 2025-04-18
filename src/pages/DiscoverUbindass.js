import React, { useState } from 'react';

const DiscoverUbindass = () => {
    const [showMore, setShowMore] = useState(false);

    return (
        <div className="container py-5">
            <h5 style={{ color: '#f36478' }} className="text-uppercase d-flex align-items-center justify-content-center fw-bold mb-3">AT UBINDASS:</h5>

            <p className="mb-3">
                Discover the perfect blend of trendy and stylish women's wear at Ubindass! Step into a world of ready-made western outfits that redefine fashion. From chic dresses to statement tops, we’ve got everything you need to elevate your wardrobe.
            </p>
            <h6 className="text-uppercase fw-bold mt-4 mb-3">
                BUY ONLINE WESTERN DRESSES IN INDIA - UBINDASS
            </h6>

            <p>
                At Ubindass, we bring you the latest trends in women’s fashion with a stylish and versatile collection for every occasion. Whether you’re looking for a glamorous women’s party dress to shine at events, a trendy coord dress for effortless style, or a stunning gown dress to make a statement, we have it all!
            </p>

            {!showMore ? (
                <>
                    <p className='d-flex align-items-center justify-content-center'>
                        <button
                            style={{
                                fontSize: '16px', color: '#f36478', backgroundColor: 'white', borderBottom: 'solid 1px #f36478', lineHeight: '1'
                            }}
                            onClick={() => setShowMore(true)}
                        >
                            Read More
                        </button>
                    </p>
                </>
            ) : (
                <>


                    <p>
                        Elevate your wardrobe with our elegant Indo Western dresses, perfect for wedding functions and festive celebrations, or keep it chic with our fashionable crop tops for women, ideal for pairing with jeans, skirts, or palazzos.
                    </p>

                    <p>
                        For a bold and confident look, explore our figure-hugging bodycon dresses, designed to accentuate your curves and make you stand out effortlessly. Explore the best of fashion with Ubindass and redefine your style with confidence! 💃✨
                    </p>


                </>
            )}
        </div>
    );
};

export default DiscoverUbindass;
