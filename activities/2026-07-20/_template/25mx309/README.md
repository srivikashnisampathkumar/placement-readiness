# README

## Project Overview

This project implements the K-Means Clustering algorithm from scratch using Python without using the Scikit-learn library. The algorithm groups customer coordinates into **K** clusters based on the distance between data points and cluster centroids.

## Objective

The main objective is to divide a 2D customer dataset into different clusters, calculate the final centroid positions, and display the clustered data.

## Methodology

1. Load the 2D customer dataset.
2. Select K initial centroids.
3. Calculate the distance between each point and every centroid.
4. Assign each point to the nearest centroid.
5. Recalculate the centroid of each cluster.
6. Repeat the process until the centroids no longer change or the maximum number of iterations is reached.
7. Display the final clusters and centroid coordinates.

## Architecture

Dataset
↓
Initialize K Centroids
↓
Calculate Distance
↓
Assign Points to Nearest Centroid
↓
Update Centroids
↓
Repeat Until Convergence
↓
Final Clusters and Centroids

## Big-O Analysis

- Distance calculation: **O(n × k)**
- Cluster assignment: **O(n × k)**
- Centroid update: **O(n)**
- Overall complexity: **O(i × n × k)**

Where:
- **n** = Number of data points
- **k** = Number of clusters
- **i** = Number of iterations

## Technologies Used

- Python
- NumPy
- Matplotlib (for visualization)

## Outcome

The algorithm successfully grouped the customer data into K clusters and calculated the final centroid coordinates without using Scikit-learn.
