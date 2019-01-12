import React, { Component } from 'react';
import ImageCard from './components/imageCard';
import { Image, ScrollView, View } from 'react-native';
import { Card, CardItem, Text, Button, Icon, Left, Body, Right } from 'native-base';
export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { realm: null };

  }

  componentWillMount() {
  }

  render() {

    return (
      <ScrollView>
        <ImageCard></ImageCard>
      </ScrollView>
    );
  }
}