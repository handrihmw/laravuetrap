<template>
  <section class="col-lg-12 connectedSortable">
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">
          <i class="fas fa-chart-pie mr-1"></i>
          Sales
        </h3>
      </div>
      <div class="card-body">
        <div class="tab-content p-0">
          <div
            class="chart tab-pane active"
            id="revenue-chart"
            style="position: relative; height: 300px;"
          >
            <canvas id="revenue-chart-canvas" height="300" style="height: 300px;"></canvas>
          </div>
          <div class="chart tab-pane" id="sales-chart" style="position: relative; height: 300px;">
            <canvas id="sales-chart-canvas" height="300" style="height: 300px;"></canvas>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>