<template>
  <div class="row">
    <div class="col-12">
      <h4>Statistiques des armes</h4>
      <table
        v-if="$store.state.player.weapons.success"
        v-bind:class="table.class"
      >
        <thead>
          <tr>
            <th
              v-for="item in table.columns.stats"
              v-bind:key="item"
            >
              {{ item }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="weapons in $store.state.player.weapons.stats"
            v-bind:key="weapons.smweapon"
          >
            <td> <!--
              <img
                v-bind:src="require(`@/assets/weapons/${weapons.smweapon}.png`)"
                id="weapons"
                title="weapons"
                class="mx-auto d-block"
              /> -->
            </td>
            <td>
                {{ weapons.smshots }}
            </td>
            <td>
                {{ weapons.smhits }}
            </td>
            <td>
                {{ weapons.smdamage }}
            </td>
            <td>
                {{ weapons.smheadshots }}
            </td>
            <td>
                {{ weapons.smkills }}
            </td>
            <td>
                {{ weapons.smkdr }}
            </td>
            <td>
                {{ weapons.smaccuracy }}
            </td>
            <td>
                {{ weapons.smdhr }}
            </td>
            <td>
                {{ weapons.smspk }}
            </td>
          </tr>
        </tbody>
      </table>
      <span
        v-else
        class="alert bg-danger"
      >
        Not Enought Data!
      </span>
    </div>
    <div class="col-12">
      <h4>Statistiques des trajectoires</h4>
      <table
        v-if="$store.state.player.weapons.success"
        v-bind:class="table.class"
      >
        <thead>
          <tr>
            <th
              v-for="item in table.columns.targets"
              v-bind:key="item"
            >
              {{ item }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="weapons in $store.state.player.weapons.targets"
            v-bind:key="weapons.smweapon"
          >
            <td> <!--
              <img
                v-bind:src="require(`@/assets/weapons/${weapons.smweapon}.png`)"
                id="weapons"
                title="weapons"
                class="mx-auto d-block"
              /> -->
            </td>
            <td>
                {{ weapons.smhead }}
            </td>
            <td>
                {{ weapons.smchest }}
            </td>
            <td>
                {{ weapons.smstomach }}
            </td>
            <td>
                {{ weapons.smleftarm }}
            </td>
            <td>
                {{ weapons.smrightarm }}
            </td>
            <td>
                {{ weapons.smleftleg }}
            </td>
            <td>
                {{ weapons.smrightleg }}
            </td>
            <td>
                {{ weapons.smhits }}
            </td>
            <td>
                {{ weapons.smleft }}
            </td>
            <td>
                {{ weapons.smright }}
            </td>
            <td>
                {{ weapons.smmiddle }}
            </td>
          </tr>
        </tbody>
      </table>
      <span
        v-else
      >
        Not Enought Data!
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PlayerStats',
  data () {
    return {
      table: {
        class: 'table table-responsive-lg table-sm table-dark table-striped table-bordered text-right',
        columns: {
          stats: ['', 'Shots', 'Hits', 'Damage', 'Headshots', 'Kills', 'Kills / Death', 'Accuracy', 'Damage per Hit', 'Shot per Kill'],
          targets: ['', 'Head', 'Chest', 'Stomach', 'Left arm', 'Right arm', 'Left leg', 'Right leg', 'Hits', 'Left', 'Right', 'Middle']
        }
      }
    }
  }
}
</script>
