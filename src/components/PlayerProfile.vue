<template>
  <div>
 
    <PlayerSummary />

    <PlayerCharts />

    <PlayerStats />

  </div>
</template>

<script>
import PlayerSummary from '@/components/PlayerSummary'
import PlayerCharts from '@/components/PlayerCharts'
import PlayerStats from '@/components/PlayerStats'


export default {
  name: 'PlayerProfile',
  props: ['id'],
  components: {
    PlayerSummary,
    PlayerCharts,
    PlayerStats
  }
}
</script>
