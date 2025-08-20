import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import RangeSlider from 'rn-range-slider'
import { Label, Notch, Rail, RailSelected, Thumb } from './RangeComp'

type prop = {
  minPrice: number
  maxPrice: number
  setMinPrice: React.Dispatch<React.SetStateAction<number>>
  setMaxPrice: React.Dispatch<React.SetStateAction<number>>
}

const PriceRangeSlider = ({ minPrice, maxPrice, setMaxPrice, setMinPrice }: prop) => {
  // const [minPrice, setMinPrice] = useState(2000)
  // const [maxPrice, setMaxPrice] = useState(500000)

  const renderThumb = () => <Thumb />
  const renderRail = () => <Rail />
  const renderRailSelected = () => <RailSelected />
  const renderLabel = (value: number) => <Label text={String(value)} />
  const renderNotch = () => <Notch />

  return (
    <View style={styles.container}>


      <View className="pt-6 px-3 flex-row justify-between">
        <View className=" w-[100px] py-1.5 ">
          <Text className="text-center font-montserrat-Medium">
            £{minPrice.toLocaleString()}
          </Text>
        </View>

        <View className="b w-[100px] py-1.5">
          <Text className="text-center font-montserrat-Medium" >
            £{maxPrice.toLocaleString()}
          </Text>
        </View>
      </View>

      <RangeSlider
        min={500}
        max={100000}
        step={10}
        low={minPrice}
        high={maxPrice}
        renderThumb={renderThumb}
        renderRail={renderRail}
        renderRailSelected={renderRailSelected}
        renderLabel={renderLabel}
        renderNotch={renderNotch}
        onValueChanged={(low, high) => {
          setMinPrice(low)
          setMaxPrice(high)
        }}
      />

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  rangeText: {
    fontSize: 14,
    marginBottom: 20,
  },
})

export default PriceRangeSlider
