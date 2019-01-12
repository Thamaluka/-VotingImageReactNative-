import React, { Component } from 'react';
import { Image, ScrollView } from 'react-native';
import { Card, CardItem, Text, Button, Icon, Left, Body, Right } from 'native-base';
import { inicializateRealm, queryAllList, updateLike, updateDislike } from '../db/allShema';
import { Buffer } from 'buffer'

export default class ImageCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            list: null
        }
    }

    componentWillMount() {
        inicializateRealm().then().catch((error) => {
            alert(`${error}`);
        });

        queryAllList().then((allList) => {
            this.setState({ list: allList });
        }).catch((error) => {
            this.setState({ list: [] });
        });
    }

    onLike(id, like) {
        like++;
        updateLike(id, like).then(() => {
            this.forceUpdate();
        }).catch((error) => {
            alert(`${error}`);
        });
    }

    onDislike(id, dislike) {
        dislike++;
        updateDislike(id, dislike).then(() => {
            this.forceUpdate();
        }).catch((error) => {
            alert(`${error}`);
        });
    }

    render() {
        if (this.state.list == null) {
            return (<Text>Loading ...</Text>)
        } else
            return (

                <ScrollView>
                    {this.state.list.map((item, index) => {
                        
                        return <Card >
                            <CardItem>
                                <Left>
                                    <Body>
                                        <Text>{item.title}</Text>
                                    </Body>
                                </Left>
                            </CardItem>

                            <CardItem cardBody>
                                <Image source={item.image} style={{ height: 200, width: null, flex: 1 }} />
                            </CardItem>

                            <CardItem>
                                <Left>
                                    <Button transparent onPress={() => { this.onLike(item.id, item.like) }}>
                                        <Icon name="thumbs-up" />
                                        <Text>{item.like} Likes</Text>
                                    </Button>
                                </Left>

                                <Right>
                                    <Button transparent onPress={() => { this.onDislike(item.id, item.dislike) }}>
                                        <Icon name="thumbs-down" />
                                        <Text>{item.dislike} Dislikes</Text>
                                    </Button>
                                </Right>
                            </CardItem>
                        </Card>
                    })}
                </ScrollView>
            );
    }
}