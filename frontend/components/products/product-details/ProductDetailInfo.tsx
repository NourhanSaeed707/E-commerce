import { Button } from 'antd'
import React from 'react'

function ProductDetailInfo() {
  return (
    <div>
        <div className=''>
            <div>
                product name
            </div>
            <div>
                price
            </div>
        </div>
        <div>
            <div>size</div>
            <div>size table</div>
        </div>
        <div>
            <Button>Add to card</Button>
        </div>
    </div>
  )
}

export default ProductDetailInfo